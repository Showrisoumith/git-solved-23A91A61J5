/**
 * Unified System Monitoring Script
 * Supports both Production and Development environments
 * Version: 3.0.0
 */

const ENV = process.env.NODE_ENV || 'development';

const monitorConfig = {
  environment: ENV,
  interval: ENV === 'production' ? 60000 : 5000,
  alertThreshold: ENV === 'production' ? 80 : 90,
  metricsEndpoint:
    ENV === 'production'
      ? 'http://localhost:8080/metrics'
      : 'http://localhost:3000/metrics',
  debugMode: ENV === 'development',
  verboseLogging: ENV === 'development',
};

console.log('=================================');
console.log(`DevOps Simulator - Monitor v3.0 (${ENV.toUpperCase()})`);
if (monitorConfig.debugMode) console.log('Development Mode: ENABLED');
console.log('=================================');

function checkSystemHealth() {
  const timestamp = new Date().toISOString();

  if (monitorConfig.debugMode) {
    console.log(`\n[${timestamp}] === DETAILED HEALTH CHECK ===`);
  } else {
    console.log(`[${timestamp}] Checking system health...`);
  }

  // Simulate system metrics
  const cpuUsage = Math.random() * 100;
  const memUsage = Math.random() * 100;
  const diskUsage = Math.random() * 100;

  console.log(`✓ CPU usage: ${cpuUsage.toFixed(2)}%`);
  console.log(`✓ Memory usage: ${memUsage.toFixed(2)}%`);
  console.log(`✓ Disk space: ${diskUsage.toFixed(2)}% used`);

  // Extra info for development
  if (monitorConfig.debugMode) {
    console.log('✓ Hot reload: Active');
    console.log('✓ Debug port: 9229');
    console.log('✓ Source maps: Enabled');
  }

  // Evaluate health
  const maxUsage = Math.max(cpuUsage, memUsage, diskUsage);
  if (maxUsage > monitorConfig.alertThreshold) {
    console.log('⚠️  System Status: WARNING - High resource usage');
  } else {
    console.log('✅ System Status: HEALTHY');
  }

  if (monitorConfig.verboseLogging) {
    console.log(`Next check in ${monitorConfig.interval}ms`);
  }
}

// Start monitoring
console.log(`Monitoring every ${monitorConfig.interval}ms`);
setInterval(checkSystemHealth, monitorConfig.interval);

// Run first check immediately
checkSystemHealth();

// Development-only: log memory usage periodically
if (monitorConfig.debugMode) {
  setInterval(() => {
    const memUsage = process.memoryUsage();
    console.log('\n--- Memory Usage ---');
    console.log(`RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  }, 30000);
}
