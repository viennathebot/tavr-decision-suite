import { useMemo, useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useCalculatorStore } from "../../store/calculatorStore";
import * as calc from "../../lib/calculations";
import { classifyAS } from "../../lib/classification";
import { generateRecommendations } from "../../lib/recommendations";
import { Card } from "../ui/Card";
import { ResultRow } from "../ui/ResultRow";
import { SeverityBar } from "../ui/SeverityBar";
import { PatternCard } from "./PatternCard";
import { RecommendationCard } from "./RecommendationCard";
import { CalciumInterpretation } from "./CalciumInterpretation";
import { MeasurementErrorChecklist } from "./MeasurementErrorChecklist";
import { Disclaimer } from "../ui/Disclaimer";
import { Colors } from "../../constants/theme";

// ─── Severity helpers ──────────────────────────────────────────────────────

function avaSeverity(v: number): "normal" | "warning" | "danger" {
  if (v < 1.0) return "danger";
  if (v <= 1.5) return "warning";
  return "normal";
}

function sviSeverity(v: number): "normal" | "danger" {
  return v < 35 ? "danger" : "normal";
}

function dviSeverity(v: number): "normal" | "danger" {
  return v < 0.25 ? "danger" : "normal";
}

function lvefSeverity(v: number): "normal" | "warning" | "danger" {
  if (v < 50) return "danger";
  if (v < 55) return "warning";
  return "normal";
}

// ─── Debounced results hook ────────────────────────────────────────────────

interface ComputedResults {
  bsa?: number;
  ava?: number;
  indexedAVA?: number;
  svi?: number;
  flowRate?: number;
  dvi?: number;
  arterialCompliance?: number;
}

function useComputedResults() {
  const demographics = useCalculatorStore((s) => s.demographics);
  const echo = useCalculatorStore((s) => s.echo);

  const rawResults = useMemo(() => {
    const results: ComputedResults = {};

    // BSA
    if (demographics.heightCm !== undefined && demographics.weightKg !== undefined) {
      results.bsa = calc.bsa(demographics.heightCm, demographics.weightKg);
    }

    // AVA via continuity equation
    if (
      echo.lvotDiameter !== undefined &&
      echo.lvotTVI !== undefined &&
      echo.aovTVI !== undefined
    ) {
      results.ava = calc.ava(echo.lvotDiameter, echo.lvotTVI, echo.aovTVI);
    }

    // Indexed AVA
    if (results.ava !== undefined && results.bsa !== undefined) {
      results.indexedAVA = calc.indexedAVA(results.ava, results.bsa);
    }

    // SVI
    if (echo.strokeVolume !== undefined && results.bsa !== undefined) {
      results.svi = calc.strokeVolumeIndex(echo.strokeVolume, results.bsa);
    }

    // Flow rate
    if (echo.strokeVolume !== undefined && echo.lvEjectionTime !== undefined) {
      results.flowRate = calc.flowRate(echo.strokeVolume, echo.lvEjectionTime);
    }

    // DVI
    if (echo.lvotTVI !== undefined && echo.aovTVI !== undefined) {
      results.dvi = calc.dvi(echo.lvotTVI, echo.aovTVI);
    }

    // Arterial compliance
    if (
      results.svi !== undefined &&
      echo.systolicBP !== undefined &&
      echo.diastolicBP !== undefined &&
      echo.systolicBP > echo.diastolicBP
    ) {
      results.arterialCompliance = calc.arterialCompliance(
        results.svi,
        echo.systolicBP,
        echo.diastolicBP
      );
    }

    return results;
  }, [demographics, echo]);

  // Debounce: delay propagation by 150ms
  const [debouncedResults, setDebouncedResults] = useState(rawResults);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedResults(rawResults);
    }, 150);
    return () => clearTimeout(timeout);
  }, [rawResults]);

  return debouncedResults;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function ResultsPanel() {
  const echo = useCalculatorStore((s) => s.echo);
  const demographics = useCalculatorStore((s) => s.demographics);
  const ct = useCalculatorStore((s) => s.ct);
  const results = useComputedResults();

  const dobutamine = useCalculatorStore((s) => s.dobutamine);

  // Classification (with Clavel 2015 inputs)
  const classification = useMemo(() => {
    return classifyAS(
      {
        ava: results.ava,
        meanGradient: echo.meanGradient,
        vmax: echo.vmax,
        lvef: echo.lvef,
        svi: results.svi,
        dvi: results.dvi,
      },
      {
        sex: demographics.sex as 'male' | 'female' | undefined,
        calciumScore: ct.calciumScore,
        stressAVA: dobutamine.stressAVA,
        stressMeanGradient: dobutamine.stressMeanGradient,
      },
    );
  }, [results.ava, results.svi, results.dvi, echo.meanGradient, echo.vmax, echo.lvef, demographics.sex, ct.calciumScore, dobutamine.stressAVA, dobutamine.stressMeanGradient]);

  // Recommendations
  const recommendations = useMemo(() => {
    if (!classification) return [];
    try {
      const hasDobutamineData =
        dobutamine.stressAVA !== undefined ||
        dobutamine.stressMeanGradient !== undefined;
      return generateRecommendations({
        pattern: classification.pattern,
        symptomatic: demographics.symptomatic ?? false,
        lvef: echo.lvef,
        calciumScore: ct.calciumScore,
        sex: demographics.sex,
        nyhaClass: demographics.nyhaClass,
        hasDobutamineData,
        stressAVA: dobutamine.stressAVA,
        stressMeanGradient: dobutamine.stressMeanGradient,
      });
    } catch {
      return [];
    }
  }, [classification, results, echo, ct, demographics]);

  const hasAnyResult =
    results.bsa !== undefined ||
    results.ava !== undefined ||
    results.dvi !== undefined;

  if (!hasAnyResult) {
    return (
      <Card style={{ marginVertical: 8 }}>
        <Text
          style={{
            color: Colors.muted,
            fontSize: 14,
            textAlign: "center",
            paddingVertical: 24,
            lineHeight: 22,
          }}
        >
          Enter echocardiographic and demographic data above to see calculated
          results and AS classification.
        </Text>
      </Card>
    );
  }

  return (
    <View style={{ gap: 8 }}>
      {/* ── Calculated Values ────────────────────────────────────────── */}
      <Card>
        <Text
          style={{
            color: Colors.primary,
            fontSize: 16,
            fontWeight: "700",
            marginBottom: 8,
          }}
        >
          Calculated Results
        </Text>

        <ResultRow
          label="BSA"
          value={results.bsa}
          unit="m\u00B2"
          severity="info"
          hint="Mosteller formula"
        />

        <ResultRow
          label="AVA"
          value={results.ava}
          unit="cm\u00B2"
          severity={results.ava !== undefined ? avaSeverity(results.ava) : undefined}
          hint="Continuity equation"
        />

        <ResultRow
          label="Indexed AVA"
          value={results.indexedAVA}
          unit="cm\u00B2/m\u00B2"
          severity={
            results.indexedAVA !== undefined
              ? results.indexedAVA < 0.6
                ? "danger"
                : "normal"
              : undefined
          }
          hint="Severe: <0.6"
        />

        <ResultRow
          label="SVI"
          value={results.svi}
          unit="mL/m\u00B2"
          severity={results.svi !== undefined ? sviSeverity(results.svi) : undefined}
          hint="Low-flow: <35"
        />

        <ResultRow
          label="Flow Rate"
          value={results.flowRate}
          unit="mL/s"
          severity={
            results.flowRate !== undefined
              ? results.flowRate < 200
                ? "danger"
                : "normal"
              : undefined
          }
          hint="Low-flow: <200"
        />

        <ResultRow
          label="DVI"
          value={results.dvi}
          unit=""
          severity={results.dvi !== undefined ? dviSeverity(results.dvi) : undefined}
          hint="Severe: <0.25"
        />

        {echo.lvef !== undefined && (
          <ResultRow
            label="LVEF"
            value={echo.lvef}
            unit="%"
            severity={lvefSeverity(echo.lvef)}
          />
        )}

        <ResultRow
          label="Arterial Compliance"
          value={results.arterialCompliance}
          unit="mL/m\u00B2/mmHg"
          severity={
            results.arterialCompliance !== undefined
              ? results.arterialCompliance < 0.6
                ? "danger"
                : "normal"
              : undefined
          }
          hint="Low: <0.6"
        />
      </Card>

      {/* ── Severity Bars ────────────────────────────────────────────── */}
      {(results.ava !== undefined || echo.meanGradient !== undefined) && (
        <Card>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 8,
            }}
          >
            Severity Grading
          </Text>

          {results.ava !== undefined && (
            <SeverityBar
              label="AVA"
              value={results.ava}
              max={3.0}
              unit="cm\u00B2"
              thresholds={[
                { value: 0, color: Colors.danger, label: "Severe" },
                { value: 1.0, color: Colors.warning, label: "Moderate" },
                { value: 1.5, color: Colors.success, label: "Mild" },
              ]}
            />
          )}

          {echo.meanGradient !== undefined && (
            <SeverityBar
              label="Mean Gradient"
              value={echo.meanGradient}
              max={80}
              unit="mmHg"
              thresholds={[
                { value: 0, color: Colors.success, label: "Mild" },
                { value: 20, color: Colors.warning, label: "Moderate" },
                { value: 40, color: Colors.danger, label: "Severe" },
              ]}
            />
          )}
        </Card>
      )}

      {/* ── Measurement Error Checklist ──────────────────────────────── */}
      <MeasurementErrorChecklist
        lvotDiameter={echo.lvotDiameter}
        systolicBP={echo.systolicBP}
        bsa={results.bsa}
        ava={results.ava}
        dvi={results.dvi}
        lvotTVI={echo.lvotTVI}
        indexedAVA={results.indexedAVA}
      />

      {/* ── Calcium Interpretation ───────────────────────────────────── */}
      {(ct.calciumScore !== undefined || demographics.sex !== undefined) && (
        <CalciumInterpretation
          calciumScore={ct.calciumScore}
          sex={demographics.sex}
        />
      )}

      {/* ── Classification ───────────────────────────────────────────── */}
      {classification && (
        <>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 16,
              fontWeight: "700",
              marginTop: 8,
            }}
          >
            AS Classification
          </Text>
          <PatternCard
            pattern={classification.pattern}
            patternName={classification.patternName}
            description={classification.description}
            confidence={classification.confidence}
            discordances={classification.discordances}
            clavelClassification={classification.clavelClassification}
          />
        </>
      )}

      {/* ── Recommendations ──────────────────────────────────────────── */}
      {recommendations.length > 0 && (
        <>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 16,
              fontWeight: "700",
              marginTop: 8,
            }}
          >
            Recommendations
          </Text>
          {recommendations.map((rec, i) => (
            <RecommendationCard
              key={i}
              title={rec.title}
              description={rec.description}
              urgency={rec.urgency}
              actions={rec.actions}
              guideline={rec.guideline}
              guidelineClass={rec.guidelineClass}
              citation={rec.citation}
            />
          ))}
        </>
      )}

      {/* ── Disclaimer ───────────────────────────────────────────────── */}
      <Disclaimer />
    </View>
  );
}
