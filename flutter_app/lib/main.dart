import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_local_connect/screens/home_screen.dart';
import 'package:flutter_local_connect/screens/marketplace_screen.dart';
import 'package:flutter_local_connect/screens/product_detail_screen.dart';
import 'package:flutter_local_connect/screens/profile_screen.dart';
import 'package:flutter_local_connect/screens/auth_screen.dart';
import 'package:flutter_local_connect/services/auth_service.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Load environment variables from .env in flutter_app/
  await dotenv.load(fileName: '.env');
  await AuthService.initialize(); // loads token from secure storage
  runApp(const ProviderScope(child: LocalConnectApp()));
}

class LocalConnectApp extends StatelessWidget {
  const LocalConnectApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Local Connect',
      theme: ThemeData(
        primarySwatch: Colors.green,
        useMaterial3: true,
      ),
      initialRoute: '/',
      routes: {
        '/': (_) => const HomeScreen(),
        '/marketplace': (_) => const MarketplaceScreen(),
        '/product': (_) => const ProductDetailScreen(), // expects args
        '/profile': (_) => const ProfileScreen(),
        '/auth': (_) => const AuthScreen(),
      },
    );
  }
}
