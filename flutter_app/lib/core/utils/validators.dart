class Validators {
  static bool isValidPhone(String s) {
    final cleaned = s.replaceAll(RegExp(r'\D'), '');
    return cleaned.length == 10;
  }

  static bool isNonEmpty(String s) => s.trim().isNotEmpty;
}
