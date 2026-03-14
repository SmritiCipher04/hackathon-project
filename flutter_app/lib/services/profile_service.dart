import 'package:dio/dio.dart';
import 'api_client.dart';

class ProfileService {
  final Dio _dio = ApiClient().dio;

  Future<Map<String, dynamic>> getProfile() async {
    final resp = await _dio.get('/profile/me');
    return resp.data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> updateProfile(dynamic data) async {
    final bool isFormData = data is FormData;
    final resp = await _dio.put('/profile/update', data: data,
        options: isFormData
            ? Options(headers: {'Content-Type': 'multipart/form-data'})
            : null);
    return resp.data as Map<String, dynamic>;
  }
}
