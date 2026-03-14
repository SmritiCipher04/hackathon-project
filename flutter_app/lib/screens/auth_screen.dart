import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/auth_provider.dart';

class AuthScreen extends ConsumerStatefulWidget {
  const AuthScreen({super.key});

  @override
  ConsumerState<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends ConsumerState<AuthScreen> {
  final TextEditingController phoneCtrl = TextEditingController();
  final TextEditingController otpCtrl = TextEditingController();
  bool otpSent = false;
  bool loading = false;

  Future<void> _requestOtp() async {
    final phone = phoneCtrl.text.trim();
    if (phone.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Enter phone')));
      return;
    }
    setState(() => loading = true);
    try {
      final resp = await ref.read(authProvider.notifier).requestOtp(phone);
      if (resp['success'] == true) {
        setState(() => otpSent = true);
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('OTP sent')));
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(resp['message']?.toString() ?? 'Failed to request OTP')));
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
    } finally {
      setState(() => loading = false);
    }
  }

  Future<void> _verifyOtp() async {
    final phone = phoneCtrl.text.trim();
    final otp = otpCtrl.text.trim();
    if (otp.length < 4) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Enter OTP')));
      return;
    }
    setState(() => loading = true);
    try {
      final resp = await ref.read(authProvider.notifier).verifyOtp(phone, otp);
      if (resp['success'] == true) {
        // navigate to home
        Navigator.pushNamedAndRemoveUntil(context, '/', (r) => false);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(resp['message']?.toString() ?? 'Invalid OTP')));
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
    } finally {
      setState(() => loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sign in')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(controller: phoneCtrl, keyboardType: TextInputType.phone, decoration: const InputDecoration(labelText: 'Phone')),
            const SizedBox(height: 12),
            if (otpSent)
              TextField(controller: otpCtrl, decoration: const InputDecoration(labelText: 'OTP')),
            const SizedBox(height: 16),
            ElevatedButton(onPressed: loading ? null : () async {
              if (otpSent) {
                await _verifyOtp();
              } else {
                await _requestOtp();
              }
            }, child: loading ? const SizedBox(height: 16, width: 16, child: CircularProgressIndicator(strokeWidth: 2)) : Text(otpSent ? 'Verify OTP' : 'Request OTP')),
            const SizedBox(height: 12),
            OutlinedButton(onPressed: () => Navigator.pop(context), child: const Text('Back')),
          ],
        ),
      ),
    );
  }
}
