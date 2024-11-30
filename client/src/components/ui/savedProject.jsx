import React, { useEffect, useState } from "react";

const SavedProject = () => {
  const [savedProjects, setSavedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchSavedProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/saved-projects", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setSavedProjects(data.savedProjects);
        } else {
          setError(data.message || "Failed to load saved projects");
        }
      } catch (err) {
        setError("Error fetching saved projects: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProjects();
  }, []);

  const handleViewDetails = (project) => {
    setSelectedProject((prev) => (prev && prev._id === project._id ? null : project));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Saved Projects</h1>
      {savedProjects.length === 0 ? (
        <p className="text-center text-gray-600">No saved projects yet. Explore and save some!</p>
      ) : (
        <div className="space-y-8">
          {savedProjects.map((project) => (
            <div
              key={project._id}
              className="saved-project-card bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Project Overview */}
              <div className="p-6 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{project.jobId?.title || "Project Title"}</h2>
                  <p className="text-gray-600 mt-2">{project.jobId?.description || "No description available."}</p>
                </div>
                <button
                  onClick={() => handleViewDetails(project)}
                  className={`px-4 py-2 text-sm font-medium rounded ${
                    selectedProject?._id === project._id
                      ? "bg-gray-200 text-gray-800"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {selectedProject?._id === project._id ? "Hide Details" : "View Details"}
                </button>
              </div>

              {/* Details Section */}
              {selectedProject?._id === project._id && (
                <div className="p-6 bg-gray-50 border-t border-gray-200 animate-fadeIn">
                  <div className="flex items-center space-x-6">
                    <img
                      src={project.jobId?.company?.logo || "default-logo-url.jpg"}
                      alt={project.jobId?.company?.name || "Company Logo"}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="text-gray-700">
                        <strong>Company:</strong>{" "}
                        {project.jobId?.company?.name || "N/A"}
                      </p>
                      <p className="text-gray-700">
                        <strong>Location:</strong> {project.jobId?.location || "N/A"}
                      </p>
                      <p className="text-gray-700">
                        <strong>Website:</strong>{" "}
                        <a
                          href={project.jobId?.company?.website || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline hover:text-blue-600"
                        >
                          {project.jobId?.company?.website || "No website"}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-700">
                      <strong>Requirements:</strong>{" "}
                      {project.jobId?.requirements?.join(", ") || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <strong>Salary:</strong> ₹{project.jobId?.salary?.toLocaleString() || "N/A"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProject;
