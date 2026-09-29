<p align="center">
  <img src="page/assets/tracedance-logo.png" alt="TraceDance" width="320">
</p>

<h2 align="center">An Automated System for Building Agent Behavior Benchmarks from Real-World Agent Deployment Traces</h2>

<p align="center">
  <a href="https://arxiv.org/abs/2609.33295"><img src="https://img.shields.io/badge/Paper-arXiv%3A2609.33295-B31B1B" alt="Paper on arXiv"></a>
  <a href="https://zhishanq.github.io/TraceDance/"><img src="https://img.shields.io/badge/Website-TraceDance-355CBB" alt="Project website"></a>
</p>

## Overview

TraceDance is an agent system that automatically constructs targeted benchmarks for user-specified undesirable agent behaviors using real-world deployment traces. It uses **Anchor-and-Confirm** to retrieve and confirm relevant cases, and an **Anchor Synthesis Loop** to generate and revise specifications for custom behaviors. The benchmarks evaluate a model's next turn at a recorded decision point using a behavior-specific rubric.

![TraceDance architecture: behavior specification, Anchor-and-Confirm, instance construction, and benchmark generation.](page/assets/method.png)

## Results

### Benchmark construction and validation

![System validation: query outcomes, construction workload, and human validation.](page/assets/system-validation.png)

TraceDance fulfills 95.3% of build-target requests, producing 107 benchmarks with 4,125 instances. The figure shows query outcomes, construction workload, and human validation of instances, rubrics, and automated grading.

### Agent behavior at decision points

![Agent behavior results: pass rates by requirement, differences associated with first actions, and error-guided correction.](page/assets/next-move-patterns.png)

The figure compares pass rates across behavior requirements, contrasts different first actions on the same instances, and shows model performance on error-guided correction. The first-action comparisons describe associations, not causal effects.

## Code availability

Code is currently under internal review.

## Project website

[Visit the project website](https://zhishanq.github.io/TraceDance/).

## Citation

```bibtex
@misc{min2026tracedanceautomatedbuildingagent,
      title={TraceDance: An Automated System for Building Agent Behavior Benchmarks from Real-World Agent Deployment Traces},
      author={Dehai Min and Daoan Zhang and Yiming Zeng and Huayi Zhang and Ziyi Chen and Yan Zhang and Qinbo Bai and Mengyuan Chao and Jing Ning and Qiyue Hua and Huiyi Chen and Hanrong Zhang and Henry Peng Zou and Jie Yang and Wei Xu and Philip S. Yu},
      year={2026},
      eprint={2609.33295},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2609.33295},
}
```
