# This directory aims to manage files with markdown

## To create meta-tag or category, write below codes

```markdown
---
title: テスト記事1
description: テスト記事1です
tags: 
  - タグ1
category: その他
created_at: "2019-02-16 00:08:00"
updated_at: "2019-02-16 00:00:00"
---
```

## processmd command example

```
processmd \"contents/markdown/**/*.md\" --preview 160 --stdout --outputDir contents/json > contents/summary.json
```

## reference
https://blog.mintsu-dev.com/posts/2019-02-23-createblog1/


