import 'package:flutter/material.dart';

class OfflineBanner extends StatelessWidget {
  final bool isOnline;
  const OfflineBanner({super.key, required this.isOnline});

  @override
  Widget build(BuildContext context) {
    if (isOnline) return const SizedBox.shrink();
    return Container(
      color: Colors.red[600],
      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
      child: const Center(
        child: Text('You are offline', style: TextStyle(color: Colors.white)),
      ),
    );
  }
}
