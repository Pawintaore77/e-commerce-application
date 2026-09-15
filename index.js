/**
* Basic AWS Lambda Handler in Node.js (ES Module / CommonJS compatible)
*/
exports.handler = async (event, context) => {
// 1. Log the incoming event payload for debugging
console.log("Received event:", JSON.stringify(event, null, 2));

try {
// 2. Safely parse incoming body if it exists (useful for API Gateway POST requests)
const requestBody = event.body ? JSON.parse(event.body) : null;

// 3. Construct a friendly message
const name = requestBody?.name || event.name || "World";
const message = `Hello, ${name}! Your Node.js Lambda function executed successfully via Terraform.`;

// 4. Return an HTTP-compatible response structure
return {
statusCode: 200,
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
success: true,
message: message
})
};

} catch (error) {
console.error("Error processing event:", error);

return {
statusCode: 400,
body: JSON.stringify({
success: false,
error: "Invalid request payload"
})
};
}
};