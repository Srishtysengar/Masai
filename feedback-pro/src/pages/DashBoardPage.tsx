import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFilteredEntries, selectRatingBuckets } from "../features/feedback/selectors";
import { deleteEntry } from "../features/feedback/feedbackSlice";
import Filters from "../components/Filter";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { AppDispatch } from "../app/store";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const entries = useSelector(selectFilteredEntries);
  const buckets = useSelector(selectRatingBuckets);

  const chartData = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Ratings count",
        data: buckets,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Feedback Ratings Distribution" },
    },
    scales: { y: { beginAtZero: true, precision: 0 as const } },
  };

  return (
    <div className="container">
      <div className="topbar">
        <h2>Dashboard</h2>
        <Link to="/"><button>Back to Form</button></Link>
      </div>

      <Filters />

      <div className="card">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="card">
        <h3>Entries ({entries.length})</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Feedback</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entries.map(e => (
                <tr key={e.id}>
                  <td>{new Date(e.date).toLocaleDateString()}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td style={{ textAlign: "center" }}>{e.rating}</td>
                  <td>{e.feedback}</td>
                  <td>
                    <button
                      className="danger"
                      onClick={() => dispatch(deleteEntry(e.id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No entries match current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
