import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/user.dart';
import '../services/auth_service.dart';
import '../services/auth_api.dart';
import '../models/user.dart';

class AuthState {
  final UserModel? user;
  final String? token;
  AuthState({this.user, this.token});

  AuthState copyWith({UserModel? user, String? token}) => AuthState(
        user: user ?? this.user,
        token: token ?? this.token,
      );
}

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier(): super(AuthState(token: AuthService.instance.token));

  final AuthApi _api = AuthApi();

  Future<void> setCurrentUserFromMap(Map<String, dynamic>? userMap) async {
    if (userMap == null) return;
    final user = UserModel.fromJson(userMap);
    state = state.copyWith(user: user);
  }

  Future<void> loginWithCredentials(String email, String password) async {
    final data = await _api.login({'email': email, 'password': password});
    if (data['token'] != null) {
      await setToken(data['token']);
    }
    if (data['user'] != null) {
      await setCurrentUserFromMap(data['user']);
    }
  }

  Future<Map<String, dynamic>> requestOtp(String phone) async {
    return await _api.requestOTP(phone);
  }

  Future<Map<String, dynamic>> verifyOtp(String phone, String otp) async {
    final data = await _api.verifyOTP(phone, otp);
    if (data['token'] != null) {
      await setToken(data['token']);
    }
    if (data['user'] != null) {
      await setCurrentUserFromMap(data['user']);
    }
    return data;
  }

  Future<void> setToken(String t) async {
    await AuthService.instance.saveToken(t);
    state = state.copyWith(token: t);
  }

  Future<void> clear() async {
    await AuthService.instance.clearToken();
    state = AuthState();
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) => AuthNotifier());
