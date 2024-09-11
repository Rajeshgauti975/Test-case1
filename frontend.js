import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const RevisedNetworkDashboard = () => {
  const [networkData, setNetworkData] = useState([]);
  const [failurePrediction, setFailurePrediction] = useState(null);
  const [anomalyDetection, setAnomalyDetection] = useState(null);
  const [maintenanceSchedule, setMaintenanceSchedule] = useState([]);
  const [networkHealth, setNetworkHealth] = useState(85);
  const [historicalTrends, setHistoricalTrends] = useState([]);
  const [downtimeReduction, setDowntimeReduction] = useState(30);

  useEffect(() => {
    // Simulating data fetching and updates
    const fetchData = () => {
      // Network traffic data
      const newDataPoint = {
        time: new Date().toLocaleTimeString(),
        packetSize: Math.floor(Math.random() * 1500) + 500,
        packetRate: Math.floor(Math.random() * 100) + 50,
      };
      setNetworkData(prevData => [...prevData.slice(-19), newDataPoint]);

      // Failure prediction
      setFailurePrediction({
        risk: Math.random(),
        component: ['Router', 'Switch', 'Firewall', 'Server'][Math.floor(Math.random() * 4)],
        timeFrame: Math.floor(Math.random() * 72) + 24 // hours
      });

      // Anomaly detection
      setAnomalyDetection({
        detected: Math.random() > 0.7,
        type: ['Traffic Spike', 'Unusual Pattern', 'Security Threat'][Math.floor(Math.random() * 3)],
        severity: Math.floor(Math.random() * 100)
      });

      // Maintenance schedule
      setMaintenanceSchedule([
        { date: '2024-09-15', task: 'Router Firmware Update' },
        { date: '2024-09-20', task: 'Switch Replacement' },
        { date: '2024-09-25', task: 'Security Audit' },
      ]);

      // Historical trends
      setHistoricalTrends([
        { name: 'Jan', performance: 65 },
        { name: 'Feb', performance: 59 },
        { name: 'Mar', performance: 80 },
        { name: 'Apr', performance: 81 },
        { name: 'May', performance: 56 },
        { name: 'Jun', performance: 55 },
        { name: 'Jul', performance: 40 },
      ]);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const maintenanceData = [
    { name: 'Scheduled', value: 70 },
    { name: 'Unscheduled', value: 30 },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">AI-Driven Network Maintenance Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Real-time Network Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={networkData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="packetSize" stroke="#8884d8" name="Packet Size" />
                <Line type="monotone" dataKey="packetRate" stroke="#82ca9d" name="Packet Rate" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Failure Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            {failurePrediction && (
              <div>
                <p className="text-lg font-semibold">Risk Level: {(failurePrediction.risk * 100).toFixed(2)}%</p>
                <p>Potential failure in: {failurePrediction.component}</p>
                <p>Time Frame: Next {failurePrediction.timeFrame} hours</p>
                <Progress value={failurePrediction.risk * 100} className="mt-2" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Anomaly Detection</CardTitle>
          </CardHeader>
          <CardContent>
            {anomalyDetection && (
              <Alert variant={anomalyDetection.detected ? "destructive" : "default"}>
                <AlertTitle>{anomalyDetection.detected ? "Anomaly Detected!" : "No Anomalies"}</AlertTitle>
                <AlertDescription>
                  {anomalyDetection.detected 
                    ? `Type: ${anomalyDetection.type}, Severity: ${anomalyDetection.severity}%` 
                    : "Network behavior is normal."}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Schedule Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div className="w-1/2">
                <h3 className="text-lg font-semibold mb-2">Upcoming Maintenance</h3>
                <ul>
                  {maintenanceSchedule.map((item, index) => (
                    <li key={index} className="mb-1">{item.date}: {item.task}</li>
                  ))}
                </ul>
              </div>
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={maintenanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {maintenanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historical Trends & Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={historicalTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="performance" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Network Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">{networkHealth}%</p>
              <Progress value={networkHealth} className="mb-2" />
              <p>Overall network health based on AI analysis</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Downtime Reduction Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">{downtimeReduction}%</p>
              <p>Reduction in network downtime since AI implementation</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevisedNetworkDashboard;