use wasm_bindgen::prelude::*;
use q_excel_core::engine::parser::ParsedQuantumFormula;
use q_excel_core::engine::evaluator::QuantumFormulaEvaluator;

/// Exposes a highly optimized, single-entry WebAssembly compilation point for the browser runtime.
/// Bridges TypeScript functional canvas events with the low-overhead Rust computing matrix.
#[wasm_bindgen]
pub struct QuantumWasmBridge {
    // Structural wrapper for browser context state isolation
}

#[wasm_bindgen]
impl QuantumWasmBridge {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {}
    }

    /// Receives a raw formula token straight from the Next.js grid framework,
    /// evaluates it through the core pipeline, and returns memory-safe string arrays.
    #[wasm_bindgen]
    pub fn process_formula_stream(&self, raw_input: &str) -> Result<String, JsValue> {
        // Step 1: Parse the incoming string using the zero-allocation engine
        let parsed = ParsedQuantumFormula::parse_raw_input(raw_input);
        
        // Step 2: Route the typed formula down into the industrial evaluator engine
        let json_string_result = QuantumFormulaEvaluator::evaluate(&parsed);
        
        // Step 3: Inject the clean analytical payload string straight back to the browser V8 context
        Ok(json_string_result)
    }
}
