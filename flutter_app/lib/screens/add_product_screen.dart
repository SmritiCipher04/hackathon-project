import 'package:flutter/material.dart';

class AddProductScreen extends StatefulWidget {
  const AddProductScreen({super.key});

  @override
  State<AddProductScreen> createState() => _AddProductScreenState();
}

class _AddProductScreenState extends State<AddProductScreen> {
  final _formKey = GlobalKey<FormState>();
  String name = '';
  String price = '';
  String quantity = '';
  String location = '';
  String description = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Add Listing')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(decoration: const InputDecoration(labelText: 'Crop name'), onSaved: (v) => name = v ?? ''),
              TextFormField(decoration: const InputDecoration(labelText: 'Price'), keyboardType: TextInputType.number, onSaved: (v) => price = v ?? ''),
              TextFormField(decoration: const InputDecoration(labelText: 'Quantity'), onSaved: (v) => quantity = v ?? ''),
              TextFormField(decoration: const InputDecoration(labelText: 'Location'), onSaved: (v) => location = v ?? ''),
              TextFormField(decoration: const InputDecoration(labelText: 'Description'), maxLines: 4, onSaved: (v) => description = v ?? ''),
              const SizedBox(height: 16),
              ElevatedButton(onPressed: () {
                _formKey.currentState?.save();
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Submit stub — implement API call')));
              }, child: const Text('Save')),
            ],
          ),
        ),
      ),
    );
  }
}
