import 'dart:io';
import 'package:dio/dio.dart';
import 'api_client.dart';
import '../models/product.dart';

class PostService {
  final Dio _dio = ApiClient().dio;

  Future<List<Product>> fetchAll() async {
    final resp = await _dio.get('/posts/all');
    final data = resp.data as Map<String, dynamic>;
    final posts = (data['posts'] as List).cast<Map<String, dynamic>>();
    return posts.map((p) => Product.fromJson(p)).toList();
  }

  Future<Product> fetchById(String id) async {
    final resp = await _dio.get('/posts/$id');
    return Product.fromJson(resp.data['post'] ?? resp.data);
  }

  Future<Product?> create(Map<String, dynamic> fields, List<File> images) async {
    final form = FormData();
    fields.forEach((k, v) => form.fields.add(MapEntry(k, v.toString())));
    for (var f in images) {
      form.files.add(MapEntry('images', await MultipartFile.fromFile(f.path, filename: f.path.split('/').last)));
    }

    final resp = await _dio.post('/posts/create', data: form);
    if (resp.data['success'] == true) {
      return Product.fromJson(resp.data['post']);
    }
    return null;
  }
}
