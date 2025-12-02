/**
 * Cloudflare Pages 函数示例
 * 用于处理API请求或中间件逻辑
 */

export async function onRequest(context) {
  const { request, env, params } = context;
  
  // 处理CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  
  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }
  
  // 示例API端点
  if (request.method === 'GET') {
    return new Response(JSON.stringify({
      message: 'Zen Moment API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
  
  // 其他方法返回404
  return new Response('Not Found', {
    status: 404,
    headers: corsHeaders,
  });
}