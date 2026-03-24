import { z } from "zod";
import { usePredictHeartDisease } from "@workspace/api-client-react";
import type { UseMutationOptions } from "@tanstack/react-query";
import type { PredictionInput, PredictionResult, ErrorResponse } from "@workspace/api-client-react/src/generated/api.schemas";
import type { ErrorType, BodyType } from "@workspace/api-client-react/src/custom-fetch";

// Form validation schema that handles coercing string inputs (like Select values) to numbers for the API
export const predictionFormSchema = z.object({
  age: z.coerce.number().min(20, "Age must be at least 20").max(100, "Age must be at most 100"),
  sex: z.coerce.number({ required_error: "Please select a sex" }),
  chest_pain_type: z.coerce.number({ required_error: "Please select chest pain type" }),
  resting_blood_pressure: z.coerce.number().min(80, "Must be at least 80").max(200, "Must be at most 200"),
  cholesterol: z.coerce.number().min(100, "Must be at least 100").max(600, "Must be at most 600"),
  fasting_blood_sugar: z.coerce.number({ required_error: "Please select fasting blood sugar status" }),
  resting_ecg: z.coerce.number({ required_error: "Please select ECG result" }),
  max_heart_rate: z.coerce.number().min(60, "Must be at least 60").max(220, "Must be at most 220"),
  exercise_induced_angina: z.coerce.number({ required_error: "Please select an option" }),
  st_depression: z.coerce.number().min(0, "Cannot be negative").max(6.2, "Must be at most 6.2"),
  st_slope: z.coerce.number({ required_error: "Please select ST slope" }),
  num_major_vessels: z.coerce.number().min(0).max(3),
  thalassemia: z.coerce.number({ required_error: "Please select thalassemia status" }),
});

export type PredictionFormValues = z.infer<typeof predictionFormSchema>;

export function usePrediction(
  options?: UseMutationOptions<
    PredictionResult,
    ErrorType<ErrorResponse>,
    { data: BodyType<PredictionInput> }
  >
) {
  return usePredictHeartDisease({ mutation: options });
}
