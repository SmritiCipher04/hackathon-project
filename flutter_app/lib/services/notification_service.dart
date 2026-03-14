import 'package:dio/dio.dart';
import 'api_client.dart';

class NotificationService {
  final Dio _dio = ApiClient().dio;

  Future<List<dynamic>> fetchNotifications() async {
    final resp = await _dio.get('/notifications/my');
    return resp.data as List<dynamic>;
  }

  Future<Map<String, dynamic>> markAllRead() async {
    final resp = await _dio.put('/notifications/mark-read');
    return resp.data as Map<String, dynamic>;
  }
}
