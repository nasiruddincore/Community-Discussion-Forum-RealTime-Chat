import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const { data } = await API.get('/discussions');
        setDiscussions(data);
      } catch (error) {
        console.error("Error fetching discussions", error);
      }
    };
    fetchDiscussions();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h2 className="text-3xl font-bold mb-6">Recent Community Discussions</h2>
        <div className="space-y-4">
          {discussions.map((topic) => (
            <div key={topic._id} className="bg-white p-5 rounded-lg shadow border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold">{topic.title}</h3>
              <p className="text-gray-600 mt-2">{topic.content}</p>
              <div className="mt-4 flex gap-2">
                {topic.tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;