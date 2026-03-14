class UserModel {
  final String id;
  final String name;
  final String phone;
  final String role;
  final String? location;

  UserModel({
    required this.id,
    required this.name,
    required this.phone,
    required this.role,
    this.location,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
        id: json['_id'] ?? json['id'] ?? '',
        name: json['name'] ?? '',
        phone: json['phone'] ?? '',
        role: json['role'] ?? 'buyer',
        location: json['location'],
      );

  Map<String, dynamic> toJson() => {
        '_id': id,
        'name': name,
        'phone': phone,
        'role': role,
        'location': location,
      };
}
