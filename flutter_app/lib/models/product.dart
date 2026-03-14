class Product {
  final String id;
  final String cropName;
  final String? description;
  final double price;
  final String? location;
  final dynamic quantity;
  final String? image;
  final String status;
  final Map<String, dynamic>? userId;

  Product({
    required this.id,
    required this.cropName,
    this.description,
    required this.price,
    this.location,
    this.quantity,
    this.image,
    this.status = 'active',
    this.userId,
  });

  factory Product.fromJson(Map<String, dynamic> json) => Product(
        id: json['_id'] ?? json['id'] ?? '',
        cropName: json['cropName'] ?? json['name'] ?? '',
        description: json['description'],
        price: (json['price'] ?? 0).toDouble(),
        location: json['location'],
        quantity: json['quantity'],
        image: (json['mediaUrls'] != null && (json['mediaUrls'] as List).isNotEmpty)
            ? json['mediaUrls'][0]
            : json['image'] ?? null,
        status: json['status'] ?? 'active',
        userId: json['userId'],
      );

  Map<String, dynamic> toJson() => {
        '_id': id,
        'cropName': cropName,
        'description': description,
        'price': price,
        'location': location,
        'quantity': quantity,
        'status': status,
      };
}
