use wasm_bindgen::prelude::*;
use crate::engine::cell_state::QuantumCellState;

pub mod engine;
pub mod exporters;

/// High-performance WASM interface binder for the q-excel core computing engine.
/// Manages the live interaction between the browser's UI grid and Rust memory blocks.
#[wasm_bindgen]
pub struct QuantumEngineWasm {
    /// Internal state vector tracking active quantum cells across the spreadsheet grid
    active_states: Vec<QuantumCellState>,
}

#[wasm_bindgen]
impl QuantumEngineWasm {
    /// Initializes a new high-performance instance of the q-excel WebAssembly core.
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            active_states: Vec::new(),
        }
    }

    /// Evaluates a cell's quantum properties and pipes measurement probabilities back as a raw JSON string.
    /// Bypasses heavy serializing overhead by using string injection directly into the TypeScript state.
    #[wasm_bindgen]
    pub fn evaluate_q_cell(&mut self, is_superposition: bool) -> Result<String, JsValue> {
        let mut cell = QuantumCellState::new_pure_zero();
        
        if is_superposition {
            cell.set_superposition();
        }

        let (prob_0, prob_1) = cell.calculate_probabilities();
        
        // Formulate a lightning-fast JSON payload for the Next.js spreadsheet visualization
        let result_json = format!(
            "{{\"probability_zero\": {:.4}, \"probability_one\": {:.4}}}", 
            prob_0, prob_1
        );

        Ok(result_json)
    }
}
