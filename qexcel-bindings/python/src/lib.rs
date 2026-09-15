use pyo3::prelude::*;
use q_excel_core::engine::cell_state::QuantumCellState;

/// High-performance Python wrapper class for the underlying q-excel core computing engine.
/// Exposes the compiled Rust microsecond layer directly into corporate Power BI Python scripts.
#[pyclass]
pub struct PyQuantumEngine {
    // Internal instance of the core engine state logic
}

#[pymethods]
impl PyQuantumEngine {
    #[new]
    fn new() -> Self {
        PyQuantumEngine {}
    }

    /// Evaluates raw cell matrix structures and passes probability metrics back to Python dataframes.
    /// Perfectly tailored to intercept Power BI internal script boundaries without translation lag.
    #[pyo3(signature = (is_superposition=false))]
    fn evaluate_to_dataframe_row(&self, is_superposition: bool) -> PyResult<String> {
        let mut cell = QuantumCellState::new_pure_zero();
        
        if is_superposition {
            cell.set_superposition();
        }

        let (prob_0, prob_1) = cell.calculate_probabilities();
        
        // Construct a structured data string optimized for quick tabular ingestion by Pandas dataframes
        let dataframe_payload = format!(
            "{{\"p0\": {:.4}, \"p1\": {:.4}, \"is_quantum\": true}}", 
            prob_0, prob_1
        );

        Ok(dataframe_payload)
    }
}

/// Core module definition parsed by python runtime extensions on initialization.
#[pymodule]
fn q_excel_python(_py: Python<'_>, m: &PyModule) -> PyResult<()> {
    m.add_class::<PyQuantumEngine>()?;
    Ok(())
}
