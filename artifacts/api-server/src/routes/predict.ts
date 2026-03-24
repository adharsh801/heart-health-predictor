import { Router, type IRouter } from "express";
import {
  PredictHeartDiseaseBody,
  PredictHeartDiseaseResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const ML_SERVICE_URL =
  process.env.ML_SERVICE_URL || "http://localhost:5001";

router.post("/predict", async (req, res) => {
  const parseResult = PredictHeartDiseaseBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({ error: "Invalid input data" });
    return;
  }

  const response = await fetch(`${ML_SERVICE_URL}/ml/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parseResult.data),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { error: string };
    req.log.error(
      { status: response.status, error: errorData },
      "ML service error",
    );
    res.status(response.status).json(errorData);
    return;
  }

  const data = await response.json();
  const result = PredictHeartDiseaseResponse.parse(data);
  res.json(result);
});

export default router;
