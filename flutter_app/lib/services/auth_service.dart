import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthService {
  static final AuthService instance = AuthService._();
  static const _tokenKey = 'token';

  final FlutterSecureStorage _storage = const FlutterSecureStorage();
  String? token;

  AuthService._();

  static Future<void> initialize() async {
    final t = await instance._storage.read(key: _tokenKey);
    instance.token = t;
  }

  Future<void> saveToken(String t) async {
    token = t;
    await _storage.write(key: _tokenKey, value: t);
  }

  Future<void> clearToken() async {
    token = null;
    await _storage.delete(key: _tokenKey);
  }
}
