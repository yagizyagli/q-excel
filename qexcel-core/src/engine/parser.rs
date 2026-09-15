use serde::{Serialize, Deserialize};

/// Supported quantum formula types in the q-excel architecture.
#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub enum QuantumFormulaType {
    /// Simulates a basic quantum state or circuit execution (=QUANTUM_SIM)
    QuantumSim,
    /// Executes a quantum database search algorithm (=GROVER_SEARCH)
    GroverSearch,
    /// Calculates quantum factoring or cryptographic security levels (=SHOR_FACTOR)
    ShorFactor,
    /// Fallback for standard or unrecognized text/formulas
    Unknown,
}

/// Represents the structured components of a parsed quantum spreadsheet formula.
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ParsedQuantumFormula {
    /// The specific quantum operation to be executed
    pub formula_type: QuantumFormulaType,
    /// Extracted target cell range or parameters (e.g., "A1:B10" or "42")
    pub arguments: Vec<String>,
}

impl ParsedQuantumFormula {
    /// Parses a raw formula string typed directly into a q-excel cell grid.
    /// Example input: "=GROVER_SEARCH(A1:A100, \"target\")"
    pub fn parse_raw_input(input: &str) -> Self {
        let trimmed = input.trim();
        
        if !trimmed.starts_with('=') {
            return Self {
                formula_type: QuantumFormulaType::Unknown,
                arguments: Vec::new(),
            };
        }

        // Extract formula name and argument tokens
        if let Some(open_paren) = trimmed.find('(') {
            if let Some(close_paren) = trimmed.rfind(')') {
                let formula_name = &trimmed[1..open_paren].to_uppercase();
                let args_raw = &trimmed[open_paren + 1..close_paren];
                
                let arguments: Vec<String> = args_raw
                    .split(',')
                    .map(|s| s.trim().replace('\"', ""))
                    .filter(|s| !s.is_empty())
                    .collect();

                let formula_type = match formula_name.as_str() {
                    "QUANTUM_SIM" => QuantumFormulaType::QuantumSim,
                    "GROVER_SEARCH" => QuantumFormulaType::GroverSearch,
                    "SHOR_FACTOR" => QuantumFormulaType::ShorFactor,
                    _ => QuantumFormulaType::Unknown,
                };

                return Self { formula_type, arguments };
            }
        }

        Self {
            formula_type: QuantumFormulaType::Unknown,
            arguments: Vec::new(),
        }
    }
}
