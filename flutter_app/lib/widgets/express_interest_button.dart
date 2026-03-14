import 'package:flutter/material.dart';
import '../services/interest_service.dart';

class ExpressInterestButton extends StatefulWidget {
  final String productId;
  final Map<String, dynamic>? farmerMap;
  const ExpressInterestButton({
    super.key,
    required this.productId,
    this.farmerMap,
  });

  @override
  State<ExpressInterestButton> createState() => ExpressInterestButtonState();
}

class ExpressInterestButtonState extends State<ExpressInterestButton> {
  bool _loading = false;

  Future<void> _sendInterest() async {
    setState(() => _loading = true);
    try {
      final svc = InterestService();
      final farmerId = widget.farmerMap != null
          ? (widget.farmerMap!['_id'] ?? widget.farmerMap!['id'])
          : null;
      final payload = {
        'postId': widget.productId,
        'farmerId': farmerId,
        'message': 'Hi, I\'m interested in your listing.'
      };
      final resp = await svc.createInterest(payload);
      if (resp['success'] == true) {
        if (!mounted) return;
        ScaffoldMessenger.of(context)
            .showSnackBar(const SnackBar(content: Text('Interest sent')));
      } else {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
            content: Text(
                resp['message']?.toString() ?? 'Failed to send interest')));
      }
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Error: $e')));
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: _loading ? null : _sendInterest,
      child: _loading
          ? const SizedBox(
              width: 16,
              height: 16,
              child: CircularProgressIndicator(strokeWidth: 2))
          : const Text('Express Interest'),
    );
  }
}
