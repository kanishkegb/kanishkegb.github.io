---
layout: post
title: "Smart Pointer in C++"
category: [tutorials, guides, coding]
image: assets/images/posts/coding.jpg
# featured: true
---

Smart pointers in C++ are powerful tools that help manage memory automatically, reducing the risk of memory leaks and dangling pointers. 
Instead of manually calling `delete` to free memory, smart pointers take care of it when the object is no longer needed.

Here’s a breakdown of the main types and how they work:

---

### 🧠 What Are Smart Pointers?

Smart pointers are class templates in the C++ Standard Library that wrap raw pointers and manage their lifetime using RAII (Resource Acquisition Is Initialization).
When a smart pointer goes out of scope, it automatically deletes the object it points to.

---

### 🔑 Types of Smart Pointers

| Type            | Ownership Model                     | Use Case Example                          |
|-----------------|--------------------------------------|-------------------------------------------|
| `std::unique_ptr` | Sole ownership (non-copyable)        | Managing exclusive resources              |
| `std::shared_ptr` | Shared ownership (reference counted) | Multiple owners of the same resource      |
| `std::weak_ptr`   | Non-owning reference to `shared_ptr` | Avoiding cyclic references in shared data |

---

### 📌 Quick Examples

#### `std::unique_ptr`
```cpp
#include <memory>

std::unique_ptr<int> ptr = std::make_unique<int>(42);
// Automatically deleted when ptr goes out of scope
```

#### `std::shared_ptr`
```cpp
#include <memory>

std::shared_ptr<int> ptr1 = std::make_shared<int>(42);
std::shared_ptr<int> ptr2 = ptr1; // Both share ownership
```

#### `std::weak_ptr`
```cpp
#include <memory>

std::shared_ptr<int> shared = std::make_shared<int>(42);
std::weak_ptr<int> weak = shared; // Doesn't affect reference count
```

---

### 🧩 Why Use Smart Pointers?

- Automatic memory management
- Exception safety
- Cleaner, more maintainable code
- No need to manually `delete` objects

---

<br><br>

*Note:*

Current version of this post is generated partially using generative AI.