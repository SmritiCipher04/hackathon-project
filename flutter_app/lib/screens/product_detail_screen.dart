import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/post_provider.dart';
import '../widgets/express_interest_button.dart';

class ProductDetailScreen extends ConsumerWidget {
  const ProductDetailScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final args = ModalRoute.of(context)!.settings.arguments as String?;
    final id = args ?? '';
    final postAsync = ref.watch(postByIdProvider(id));

    return Scaffold(
      appBar: AppBar(title: const Text('Product')),
      body: postAsync.when(
        data: (p) => SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (p.image != null)
                ClipRRect(
                  borderRadius: BorderRadius.circular(18),
                  child: Image.network(p.image!,
                      height: 300, width: double.infinity, fit: BoxFit.cover),
                ),
              const SizedBox(height: 12),
              Text(p.cropName,
                  style: Theme.of(context).textTheme.headlineSmall),
              const SizedBox(height: 8),
              Text('₹${p.price}',
                  style: Theme.of(context)
                      .textTheme
                      .headlineMedium
                      ?.copyWith(color: Colors.green)),
              const SizedBox(height: 12),
              Text(p.description ?? 'No description'),
              const SizedBox(height: 20),
              ExpressInterestButton(productId: p.id, farmerMap: p.userId),
            ],
          ),
        ),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, st) => Center(child: Text('Error: $e')),
      ),
    );
  }
}
