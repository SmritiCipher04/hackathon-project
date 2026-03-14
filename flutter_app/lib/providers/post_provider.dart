import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/product.dart';
import '../services/post_service.dart';

final postListProvider = FutureProvider<List<Product>>((ref) async {
  final service = PostService();
  return service.fetchAll();
});

final postByIdProvider = FutureProvider.family<Product, String>((ref, id) async {
  final service = PostService();
  return service.fetchById(id);
});
