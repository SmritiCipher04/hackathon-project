import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Local Connect')),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 16),
              Text('Northeast India\'s Digital Marketplace', style: Theme.of(context).textTheme.labelLarge),
              const SizedBox(height: 12),
              Text('Connecting Farmers directly to Buyers', style: Theme.of(context).textTheme.headlineMedium),
              const SizedBox(height: 20),
              Row(
                children: [
                  ElevatedButton(
                    onPressed: () => Navigator.pushNamed(context, '/marketplace'),
                    child: const Text('Browse Marketplace'),
                  ),
                  const SizedBox(width: 12),
                  OutlinedButton(
                    onPressed: () => Navigator.pushNamed(context, '/profile'),
                    child: const Text('Start Selling'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
