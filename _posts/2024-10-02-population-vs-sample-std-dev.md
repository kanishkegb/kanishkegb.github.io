---
layout: post
title: "Population vs Sample Standard Deviation"
category: [tutorials, guides, statistics]
image: assets/images/posts/coding.jpg
# featured: true
---

The difference between **population standard deviation** and **sample standard deviation** boils down to who you're measuring and how you correct for bias when estimating variability.

---

### 📊 Definitions

| Type                      | What It Measures                              | Formula Difference                          |
|--------------------------|-----------------------------------------------|---------------------------------------------|
| Population Standard Deviation ($$\sigma$$) | Variability of **all** data points in a population | Divide by $$N$$ (total number of data points) |
| Sample Standard Deviation ($$s$$)    | Variability in a **subset** (sample) of the population | Divide by ($$N - 1$$) (Bessel’s correction)     |

---

### 🧠 Why the Difference?

- **Population SD** assumes you have access to every data point in the population. No need to correct for bias.
- **Sample SD** uses Bessel’s correction (dividing by $$N - 1$$) to avoid underestimating the true variability of the population. 
This correction compensates for the fact that a sample tends to be less variable than the full population.

---

### 🧮 Formulas

- **Population SD**:

$$
\sigma = \sqrt{\frac{1}{N} \sum_{i=1}^{N} (x_i - \mu)^2}
$$

- **Sample SD**:

$$
s = \sqrt{\frac{1}{N - 1} \sum_{i=1}^{N} (x_i - \bar{x})^2}
$$

Where:
-  $$x_i$$  = each data point
-  $$\mu$$  = population mean
-  $$\bar{x}$$  = sample mean
-  $$N$$  = number of data points

---

### 🎯 When to Use Which?

- Use **population SD** when you have data for the entire group you're studying (e.g., all students in a school).
- Use **sample SD** when you're working with a subset and want to generalize to the whole population (e.g., survey results from 100 out of 10,000 customers).

---

<br><br>

*Note:*

Current version of this post is generated partially using generative AI