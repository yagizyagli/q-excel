# q-excel 🚀

The open-source, ultra-fast quantum spreadsheet powered by **Rust** and **WebAssembly**. Bring industrial quantum computing formulas, real-time 3D WebGL visualizations, and enterprise business intelligence pipelines directly into an interactive grid interface.

---

## 🌟 Support the Project

If you find this project visionary, innovative, or helpful for the future of quantum software engineering, please consider giving us a **Star**! Your support helps accelerate development and brings quantum computing closer to the business world.

👉 **Star this repository to show your support!** ⭐

---

## 🏛️ System Architecture

`q-excel` is engineered with a modular, **Open-Core** architecture optimized for zero-dependency lightness, CPU-level acceleration, and high-fidelity rendering.

```text
┌────────────────────────────────────────┐
│          [ USER BROWSER UI ]           │
│   Next.js Grid Suite (Tailwind CSS)    │
└──────────────────┬─────────────────────┘
                   │ Inputs Formulas
                   ▼
┌────────────────────────────────────────┐
│     [ qexcel-bindings/typescript ]     │
│   WebAssembly Dynamic Runtime Bridge   │
└──────────────────┬─────────────────────┘
                   │ Direct Pointer Streams
                   ▼
┌────────────────────────────────────────┐
│            [ qexcel-core ]             │
│     Rust Computation Core Engine       │
│  (cell_state.rs, parser.rs, exporters) │
└──────────────────┬─────────────────────┘
                   │ Heavy Data Offloading
                   ▼
┌────────────────────────────────────────┐
│           [ qexcel-server ]            │
│         Axum Cloud API Gateway         │
└──────────────────┬─────────────────────┘
                   ▼
┌────────────────────────────────────────┐
│      [ ACTUAL QUANTUM HARDWARE ]       │
│      IBM Qiskit / AWS Braket QPUs      │
└────────────────────────────────────────┘
```

---

## 📦 Project Directory Structure

```text
q-excel/
├── qexcel-core/        # [RUST] Core Computation Engine
├── qexcel-bindings/    # Cross-Language Interop Bridges
│   ├── python/         # PyO3 Bridge for Power BI
│   └── typescript/     # Wasm Target for Browser
├── qexcel-frontend/    # [NEXT.JS / TS] Interactive Grid
├── qexcel-extensions/  # [DYNAMIC PLUGINS] Light Extensions
└── qexcel-server/      # [RUST / AXUM] Cloud SaaS API
```


## 🚀 Industrial Formula Matrix

`q-excel` bridges theoretical quantum darlings with core enterprise data pipelines:

*   **`=VQE_OPTIMIZE(range, risk_index)`**: Executes Variational Quantum Eigensolver models to compute the Markowitz efficient frontier for portfolio asset allocations.
*   **`=QAOA_SOLVE(range)`**: Leverages the Quantum Approximate Optimization Algorithm to parse high-frequency currency arbitrage and supply chain logistics paths.
*   **`=QML_CLASSIFY(range)`**: Deploys Quantum Machine Learning weights inside grid blocks for real-time institutional fraud and anomaly detection.
*   **`=GROVER_SEARCH(range, target)`**: Accelerated Quantum Database Querying.
*   **`=SHOR_FACTOR(integer)`**: Cryptographic compliance audits.

---

## 🛠️ Quick Local Setup

### Prerequisites
Ensure you have the latest versions of **Rust**, **Node.js**, and **wasm-pack** installed.

### 1. Compile the WebAssembly Core Bindings
```bash
cd qexcel-bindings/typescript
wasm-pack build --target web
```

### 2. Launch the Next.js Frontend UI Workspace
```bash
cd ../../qexcel-frontend
npm install
npm run dev
```
Open **`http://localhost:3000`** inside your preferred browser.

### 3. Spin up the Cloud SaaS Server Node
```bash
cd ../qexcel-server
cargo run --release
```

---

## ⚖️ License

Distributed under the **Apache License 2.0**. This enterprise-ready license protects core contributors against patent hoarding.

---

## 👤 Author & Developer

*   **Yağız Yağlı**: [@yagizyagli](https://github.com/yagizyagli)

---
<p align="center">Built with 🦀 Rust, ⚡ WebAssembly, and 🪐 Quantum Passion.</p>
