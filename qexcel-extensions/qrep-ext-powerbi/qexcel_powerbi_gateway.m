/*
  High-performance Power Query (M) connector template for q-excel cloud telemetry api.
  Integrates industrial quantum analytical cell streams natively into corporate Power BI Desktop models.
*/
let
    // Configurable cloud gateway address mapping to the active q-excel enterprise server instance
    GatewayUrl = "https://qexcel-server.cloud",
    
    // Formulate securely signed HTTP POST request headers with granular JSON encoding specifications
    RequestHeaders = [
        #"Content-Type" = "application/json",
        #"X-QExcel-Client-Identity" = "Enterprise-Audit-Token",
        #"Accept" = "application/json"
    ],
    
    // Fetch the live binary payload stream over standard REST network layouts
    SourceResponse = Web.Contents(GatewayUrl, [
        Headers = RequestHeaders,
        Content = Text.ToBinary("{""request_type"": ""LIVE_MATRIX_FETCH""}")
    ]),
    
    // Compile binary stream data into native structural JavaScript Object Notation blocks
    JsonData = Json.Document(SourceResponse),
    
    // Transform the raw payload arrays directly into corporate columns and spreadsheet rows
    FlattenedTable = Table.FromRecords({JsonData}),
    
    // Explicitly enforce strong analytical typing across quantum matrix data points
    TypedTable = Table.TransformColumnTypes(FlattenedTable, {
        {"cell_id", type text},
        {"algorithm_applied", type text},
        {"probability_zero", type number},
        {"probability_one", type number},
        {"calculated_at_iso", type datetimezone}
    })
in
    TypedTable
