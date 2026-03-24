import { usePrediction, type PredictionFormValues } from "@/hooks/use-prediction";
import { PredictionForm } from "@/components/PredictionForm";
import { PredictionResultCard } from "@/components/PredictionResult";
import { useToast } from "@/hooks/use-toast";
import { HeartPulse } from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const { mutate, data: predictionData, isPending } = usePrediction({
    onError: (error) => {
      toast({
        title: "Prediction Failed",
        description: error.error?.error || "An unexpected error occurred while analyzing the data.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      // Smooth scroll to top on mobile so user sees the result immediately
      if (window.innerWidth < 1024) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      toast({
        title: "Analysis Complete",
        description: "The clinical profile has been successfully evaluated.",
      });
    }
  });

  const handleSubmit = (values: PredictionFormValues) => {
    mutate({ data: values });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden selection:bg-primary/20">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-medical-bg.png`} 
          alt="Background" 
          className="w-full h-full object-cover opacity-25 mix-blend-multiply grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/90 to-background" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/40 bg-white/50 backdrop-blur-md sticky top-0">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 text-white">
              <HeartPulse className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-display font-extrabold text-foreground tracking-tight">
              CardioRisk <span className="text-primary font-normal">AI</span>
            </h1>
          </div>
          <div className="hidden md:flex text-sm text-muted-foreground font-medium">
            Clinical Prediction System v1.0
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 md:px-8 py-10 max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 leading-tight">
            Cardiovascular Risk Assessment
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Enter the patient's comprehensive clinical profile below. Our machine learning model will analyze 13 distinct features to estimate the probability of heart disease presence.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Form Column */}
          <div className="w-full lg:w-2/3 order-2 lg:order-1">
            <PredictionForm onSubmit={handleSubmit} isPending={isPending} />
          </div>

          {/* Results Column - Sticky on Desktop */}
          <div className="w-full lg:w-1/3 order-1 lg:order-2 lg:sticky lg:top-28">
            <PredictionResultCard result={predictionData} isPending={isPending} />
            
            <div className="mt-8 text-xs text-muted-foreground bg-muted/30 p-5 rounded-2xl border border-border/50">
              <p className="mb-2 font-semibold text-foreground flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Disclaimer
              </p>
              This tool provides predictions based on statistical models and is intended for informational and educational purposes only. It should not replace professional medical diagnosis, advice, or treatment.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Just importing AlertCircle here so it's available for the disclaimer
import { AlertCircle } from "lucide-react";
