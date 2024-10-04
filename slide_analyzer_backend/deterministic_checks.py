import os


def format_check(file_path):
    allowed_formats = ['.pdf', '.pptx']
    _, ext = os.path.splitext(file_path)
    accepted_format = ext.lower() in allowed_formats
    result = {
        "accepted_format": accepted_format,
        "file_type": ext.lower(),
        "message": "Format is acceptable." if accepted_format else "Unsupported file format."
    }
    return result


def size_check(file_size_mb, size_limit_mb=50):
    size_within_limit = file_size_mb <= size_limit_mb
    result = {
        "size_within_limit": size_within_limit,
        "file_size_mb": file_size_mb,
        "message": "File size is within limits." if size_within_limit else "File size exceeds the limit."
    }
    return result


def slide_count_check(slide_count, max_slides=30):
    slide_count_within_limit = slide_count <= max_slides
    result = {
        "slide_count_within_limit": slide_count_within_limit,
        "slide_count": slide_count,
        "message": "Slide count is within limits." if slide_count_within_limit else "Too many slides."
    }
    return result
