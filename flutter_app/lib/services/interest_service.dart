import 'package:dio/dio.dart';
import 'api_client.dart';

class InterestService {
  final Dio _dio = ApiClient().dio;

  Future<Map<String, dynamic>> createInterest(Map<String, dynamic> payload) async {
    final resp = await _dio.post('/interests/create', data: payload);
    return resp.data as Map<String, dynamic>;
  }
}
