import 'package:dio/dio.dart';
import 'api_client.dart';
import 'auth_service.dart';

class AuthApi {
  final Dio _dio = ApiClient().dio;

  Future<Map<String, dynamic>> firebaseLogin(String idToken) async {
    final resp = await _dio.post('/auth/firebase-login', data: {'idToken': idToken});
    final data = resp.data as Map<String, dynamic>;
    if (data['token'] != null) {
      await AuthService.instance.saveToken(data['token']);
    }
    return data;
  }

  Future<Map<String, dynamic>> signup(Map<String, dynamic> userData) async {
    final resp = await _dio.post('/auth/signup', data: userData);
    final data = resp.data as Map<String, dynamic>;
    if (data['token'] != null) {
      await AuthService.instance.saveToken(data['token']);
    }
    return data;
  }

  Future<Map<String, dynamic>> login(Map<String, dynamic> credentials) async {
    final resp = await _dio.post('/auth/login', data: credentials);
    final data = resp.data as Map<String, dynamic>;
    if (data['token'] != null) {
      await AuthService.instance.saveToken(data['token']);
    }
    return data;
  }

  Future<Map<String, dynamic>> requestOTP(String phone) async {
    final resp = await _dio.post('/auth/request-otp', data: {'phone': phone});
    return resp.data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> verifyOTP(String phone, String otp) async {
    final resp = await _dio.post('/auth/verify-otp', data: {'phone': phone, 'otp': otp});
    final data = resp.data as Map<String, dynamic>;
    if (data['token'] != null) {
      await AuthService.instance.saveToken(data['token']);
    }
    return data;
  }
}
