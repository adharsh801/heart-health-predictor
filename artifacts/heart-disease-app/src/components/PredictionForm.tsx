import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Activity } from "lucide-react";
import { predictionFormSchema, type PredictionFormValues } from "@/hooks/use-prediction";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface PredictionFormProps {
  onSubmit: (data: PredictionFormValues) => void;
  isPending: boolean;
}

export function PredictionForm({ onSubmit, isPending }: PredictionFormProps) {
  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionFormSchema),
    defaultValues: {
      age: 55,
      sex: 1,
      chest_pain_type: 0,
      resting_blood_pressure: 120,
      cholesterol: 200,
      fasting_blood_sugar: 0,
      resting_ecg: 0,
      max_heart_rate: 150,
      exercise_induced_angina: 0,
      st_depression: 0,
      st_slope: 1,
      num_major_vessels: 0,
      thalassemia: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Section: Demographics */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/60">
          <h3 className="text-lg font-display font-semibold mb-4 text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">1</div>
            Patient Demographics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age (years)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biological Sex</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Female</SelectItem>
                      <SelectItem value="1">Male</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section: Symptoms */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/60">
          <h3 className="text-lg font-display font-semibold mb-4 text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">2</div>
            Symptom Presentation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="chest_pain_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chest Pain Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Typical Angina</SelectItem>
                      <SelectItem value="1">Atypical Angina</SelectItem>
                      <SelectItem value="2">Non-anginal Pain</SelectItem>
                      <SelectItem value="3">Asymptomatic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exercise_induced_angina"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Induced Angina</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">No</SelectItem>
                      <SelectItem value="1">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section: Vitals & Blood */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/60">
          <h3 className="text-lg font-display font-semibold mb-4 text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">3</div>
            Vitals & Blood Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="resting_blood_pressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resting BP (mmHg)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cholesterol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serum Cholesterol (mg/dl)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fasting_blood_sugar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fasting Blood Sugar</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Normal (≤ 120 mg/dl)</SelectItem>
                      <SelectItem value="1">High (&gt; 120 mg/dl)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Section: Diagnostics */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/60">
          <h3 className="text-lg font-display font-semibold mb-4 text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">4</div>
            Diagnostic Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="resting_ecg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resting ECG</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select result" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Normal</SelectItem>
                      <SelectItem value="1">ST-T Wave Abnormality</SelectItem>
                      <SelectItem value="2">Left Ventricular Hypertrophy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="max_heart_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Heart Rate (bpm)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} className="h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="st_depression"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ST Depression</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} className="h-11" />
                  </FormControl>
                  <FormDescription>Relative to rest</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="st_slope"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ST Segment Slope</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select slope" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Upsloping</SelectItem>
                      <SelectItem value="1">Flat</SelectItem>
                      <SelectItem value="2">Downsloping</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="num_major_vessels"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Major Vessels</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select count" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Colored by fluoroscopy</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thalassemia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thalassemia</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Normal</SelectItem>
                      <SelectItem value="1">Fixed Defect</SelectItem>
                      <SelectItem value="2">Reversible Defect</SelectItem>
                      <SelectItem value="3">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            size="lg" 
            disabled={isPending}
            className="w-full md:w-auto px-10 h-14 rounded-xl text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 font-display tracking-wide"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Data...
              </>
            ) : (
              <>
                <Activity className="mr-2 h-5 w-5" />
                Generate Prediction
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
