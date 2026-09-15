use crate::engine::cell_state::QuantumCellState;
use serde::{Serialize, Deserialize};

/// Represents the structured real-time data payload formatted specifically 
/// for the Power BI REST Streaming Dataset API schema.
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PowerBiQuantumPayload {
    /// The target cell coordinate being tracked (e.g., "B4")
    pub cell_id: String,
    /// Name of the active industrial quantum algorithm running on the cell
    pub algorithm_applied: String,
    /// Measured probability amplitude for state |0> (e.g., asset survival chance)
    pub probability_zero: f64,
    /// Measured probability amplitude for state |1> (e.g., asset default chance)
    pub probability_one: f64,
    /// ISO timestamp marking exactly when the quantum simulation executed
    pub calculated_at_iso: String,
}

/// High-performance stream telemetry connector linking q-excel straight into corporate Power BI instances.
pub struct PowerBiPushConnector;

impl PowerBiPushConnector {
    /// Converts a live cell's quantum memory matrix into a fully compatible Power BI stream JSON payload.
    /// This bypasses sluggish intermediate translation engines, outputting a perfect raw payload string.
    pub fn build_stream_json(
        cell_id: &str, 
        algo_name: &str, 
        state: &QuantumCellState, 
        timestamp: &str
    ) -> Result<String, String> {
        let (prob_0, prob_1) = state.calculate_probabilities();

        let streaming_object = PowerBiQuantumPayload {
            cell_id: cell_id.to_string(),
            algorithm_applied: algo_name.to_string(),
            probability_zero: prob_0,
            probability_one: prob_1,
            calculated_at_iso: timestamp.to_string(),
        };

        // Leverage the high-speed serde compiler macros to generate a structured request body
        serde_json::to_string(&streaming_object)
            .map_err(|err| format!("Power BI stream serialization matrix breakdown: {}", err))
    }
}
