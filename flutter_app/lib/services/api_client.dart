import 'package:dio/dio.dart';
import 'auth_service.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiClient {
  static final ApiClient _instance = ApiClient._internal();
  factory ApiClient() => _instance;

  late final Dio dio;
  final String baseUrl = dotenv.env['API_BASE_URL'] ?? 'https://localconnect-mn7a.onrender.com/api';

  ApiClient._internal() {
    dio = Dio(BaseOptions(baseUrl: baseUrl));

    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = AuthService.instance.token;
        if (token != null && token.isNotEmpty) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (e, handler) {
        if (e.response?.statusCode == 401) {
          // handle unauthorized, optionally notify AuthService
          AuthService.instance.clearToken();
        }
        return handler.next(e);
      },
    ));
  }
}
