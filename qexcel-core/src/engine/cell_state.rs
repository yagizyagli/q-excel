use nalgebra::Complex;
use serde::{Serialize, Deserialize};

/// Represents a single Quantum Cell (Q-Cell) within the q-excel grid architecture.
/// Tracks the complex probability amplitudes for state |0> (alpha) and state |1> (beta).
#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct QuantumCellState {
    /// Complex amplitude of state |0> (Alpha)
    pub alpha: Complex<f64>,
    /// Complex amplitude of state |1> (Beta)
    pub beta: Complex<f64>,
}

impl QuantumCellState {
    /// Initializes a pure quantum cell defaulted to the absolute deterministic state |0>.
    pub fn new_pure_zero() -> Self {
        Self {
            alpha: Complex::new(1.0, 0.0),
            beta: Complex::new(0.0, 0.0),
        }
    }

    /// Sets the cell into an equal superposition state (50% chance of being 0 or 1).
    /// This forms the base computational framework for our upcoming quantum algorithms.
    pub fn set_superposition(&mut self) {
        let inv_sqrt2 = 1.0 / 2.0_f64.sqrt();
        self.alpha = Complex::new(inv_sqrt2, 0.0);
        self.beta = Complex::new(inv_sqrt2, 0.0);
    }

    /// Computes the exact measurement probabilities when mapped back into classical spreadsheet rows.
    /// Ensures mathematical consistency where |alpha|^2 + |beta|^2 always equals 1.0.
    pub fn calculate_probabilities(&self) -> (f64, f64) {
        let prob_0 = self.alpha.norm_sqr();
        let prob_1 = self.beta.norm_sqr();
        (prob_0, prob_1)
    }
}
