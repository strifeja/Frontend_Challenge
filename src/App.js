import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

const data = [
  {
    id: "1",
    patientName: "Alice Johnson",
    modality: "CT",
    studyDate: "2024-10-15",
    status: "PENDING",
    report: null
  },

  {
    id: "2",
    patientName: "Bob Martinez",
    modality: "MRI",
    studyDate: "2024-10-17",
    status: "PENDING",
    report: null
  },

  {
    id: "3",
    patientName: "Carol White",
    modality: "XR",
    studyDate: "2024-10-18",
    status: "IN_PROGRESS",
    report: null
  },

  {
    id: "4",
    patientName: "David Kim",
    modality: "US",
    studyDate: "2024-10-20",
    status: "PENDING",
    report: null
  },

  {
    id: "5",
    patientName: "Eva Brown",
    modality: "CT",
    studyDate: "2024-10-21",
    status: "COMPLETED",
    report: "No acute findings."
  },

  {
    id: "6",
    patientName: "Frank Lee",
    modality: "MRI",
    studyDate: "2024-10-22",
    status: "PENDING",
    report: null
  },

  {
    id: "7",
    patientName: "Grace Patel",
    modality: "CT",
    studyDate: "2024-10-23",
    status: "IN_PROGRESS",
    report: null
  },

  {
    id: "8",
    patientName: "Henry Nguyen",
    modality: "XR",
    studyDate: "2024-10-25",
    status: "COMPLETED",
    report: "Mild cardiomegaly noted."
  },

  {
    id: "9",
    patientName: "Iris Chen",
    modality: "US",
    studyDate: "2024-10-26",
    status: "PENDING",
    report: null
  },

  {
    id: "10",
    patientName: "James Wright",
    modality: "MRI",
    studyDate: "2024-10-28",
    status: "PENDING",
    report: null
  }
];

// Question: For filter should only the pending statuses be shown or should it
// be filtered by pending then completed then in progress?
// Assumption: Filter shows only specific status i.e pending shows only pending

// Question: Should the text are be visible in the detail view initially or should there
// be a button to show the text area for report submission??
// Assumption: The text area for report submission should be visible in the detail view initially

// Question: Should the detail view update after submitting a report and keep the detail veiw open?
// Assumption: The detail view will close after submitting a report and the table will update

// Display all cases in a table or list
// Patient name: patientName
// Modality: modality
// Study date: studyDate
// Status: status

// Add a table filter to show cases by status
// has to be visually indicated
// options: All, Pending, In Progress, Completed
// Table updates imedietly

// Clicking a row opens a modal with the case details
// All case details
// If completed and has a report, show the report
// Plan: need a selectedCase state to store selected row
// Need rows to be clickable
// Use a modal component and need a state to show/hide modal

// Step 4: Report Submission
// Create a text area

function App() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedCase, setSelectedCase] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reportText, setReportText] = useState("");

  const filteredData = data.filter((item) =>
    filterStatus === "All" ? true : item.status === filterStatus
  );

  return (
    <div>
      <div>
        <span>Filter: </span>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="All">All</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <table className="flex-center border border-gray-300">
        <tbody>
          <tr>
            <th>Patient Name</th>
            <th>Modality</th>
            <th>Study Date</th>
            <th>Status</th>
          </tr>
          {filteredData.map((item) => {
            return (
              <Fragment key={item.id}>
                <tr
                  onClick={() => {
                    setSelectedCase(item);
                    setShowModal(true);
                  }}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td>{item.patientName}</td>
                  <td>{item.modality}</td>
                  <td>{item.studyDate}</td>
                  <td>
                    <button
                      className={`px-2 py-1 rounded-md text-sm font-medium ${
                        item.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : item.status === "IN_PROGRESS"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.status}
                    </button>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
      {/* Modal for case details */}
      {showModal && selectedCase && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">Case Details</h2>
            <p>
              <strong>Patient Name:</strong> {selectedCase.patientName}
            </p>
            <p>
              <strong>Modality:</strong> {selectedCase.modality}
            </p>
            <p>
              <strong>Study Date:</strong> {selectedCase.studyDate}
            </p>
            <p>
              <strong>Status:</strong> {selectedCase.status}
            </p>
            {selectedCase.status === "COMPLETED" && selectedCase.report && (
              <p>
                <strong>Report:</strong> {selectedCase.report}
              </p>
            )}
            {/* Report Submission for PENDING and IN_PROGRESS cases */}
            {(selectedCase.status === "PENDING" ||
              selectedCase.status === "IN_PROGRESS") && (
              <div>
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Enter report details..."
                  className="border border-gray-300 rounded-md p-2"
                />
                <button
                  disabled={!reportText.trim()}
                  className={
                    "mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" +
                    (!reportText.trim() ? " opacity-50 cursor-not-allowed" : "")
                  }
                  onClick={() => {
                    selectedCase.report = reportText;
                    selectedCase.status = "COMPLETED";
                    setShowModal(false); // Close the modal after submission
                    setReportText(""); // Clear the report text after submission
                  }}
                >
                  Submit Report
                </button>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
