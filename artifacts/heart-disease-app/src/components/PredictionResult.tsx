import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Activity, HeartPulse } from "lucide-react";
import type { PredictionResult } from "@workspace/api-client-react/src/generated/api.schemas";
import { Card, CardContent } from "@/components/ui/card";

interface ResultCardProps {
  result?: PredictionResult;
  isPending: boolean;
}

export function PredictionResultCard({ result, isPending }: ResultCardProps) {
  if (isPending) {
    return (
      <Card className="border-none shadow-xl shadow-black/5 bg-white/80 backdrop-blur-md overflow-hidden">
        <CardContent className="p-10 flex flex-col items-center justify-center text-center space-y-6 min-h-[350px]">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary"
          >
            <HeartPulse className="w-10 h-10" />
          </motion.div>
          <div>
            <h3 className="text-xl font-display font-bold text-foreground">Analyzing Profile</h3>
            <p className="text-muted-foreground mt-2 max-w-[250px] mx-auto">
              Our AI model is processing the clinical data to assess cardiovascular risk...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="border border-border/50 shadow-lg shadow-black/5 bg-card overflow-hidden">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[350px]">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground mb-2 rotate-3">
            <Activity className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-display font-bold text-foreground">Awaiting Data</h3>
          <p className="text-muted-foreground max-w-[280px]">
            Fill out the clinical profile form and click Predict to generate a cardiovascular risk assessment.
          </p>
        </CardContent>
      </Card>
    );
  }

  const isHighRisk = result.prediction === 1;
  const probabilityPercentage = Math.round(result.probability * 100);

  // Circular progress math
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.probability * circumference);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className={`
        border-2 shadow-xl overflow-hidden relative
        ${isHighRisk 
          ? 'border-destructive/30 shadow-destructive/10 bg-gradient-to-b from-destructive/5 to-transparent' 
          : 'border-emerald-500/30 shadow-emerald-500/10 bg-gradient-to-b from-emerald-500/5 to-transparent'}
      `}>
        {/* Decorative background glow */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none
          ${isHighRisk ? 'bg-destructive' : 'bg-emerald-500'}
        `} />

        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Assessment Result
              </p>
              <h2 className={`text-3xl font-display font-bold flex items-center gap-2
                ${isHighRisk ? 'text-destructive' : 'text-emerald-600'}
              `}>
                {isHighRisk ? (
                  <AlertTriangle className="w-8 h-8" />
                ) : (
                  <CheckCircle2 className="w-8 h-8" />
                )}
                {result.risk_level}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-8 bg-white/50 rounded-2xl p-6 border border-border/50 shadow-sm">
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              {/* Background Circle */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted/50"
                />
                {/* Animated Foreground Circle */}
                <motion.circle
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeLinecap="round"
                  className={isHighRisk ? 'text-destructive' : 'text-emerald-500'}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-display font-bold text-foreground">
                  {probabilityPercentage}%
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-1">Risk Probability</h4>
              <p className="text-sm text-muted-foreground">
                Based on the provided clinical features, the model estimates a {probabilityPercentage}% probability of heart disease presence.
              </p>
            </div>
          </div>

          {isHighRisk && (
            <div className="mt-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive-foreground">
              <span className="font-semibold text-destructive">Recommendation:</span> High risk indicators detected. Please consult with a healthcare professional or cardiologist for a comprehensive medical evaluation.
            </div>
          )}
          {!isHighRisk && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-800">
              <span className="font-semibold">Recommendation:</span> Low risk profile detected. Continue maintaining a healthy lifestyle, balanced diet, and regular exercise routine.
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
