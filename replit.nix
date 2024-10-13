{ pkgs }:
{
  deps = [
    pkgs.python39Full  # Replace 'python39Full' with your Python version if different
    pkgs.poppler_utils # This line adds poppler utilities
  ];
}
