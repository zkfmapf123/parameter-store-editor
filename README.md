# Editor

## Architecture

![1](./public/1.png)

## Requried

- config.yaml
    - AWS Profile, Regino Setting

    ```yaml
    config:
        profile: leedonggyu
        region: ap-northeast-2
    ```

- input.yaml
    - ParameterStore 입력 시, 구성 파일

    ```yaml
    input:
        1: 
            app: internal
            env: dev
            svc: test
            source: MYSQL_HOST
            value: admin
        2: 
            app: internal
            env: dev
            svc: test
            source: MYSQL_PASSWORD
            value: 1234
        3: 
            app: internal
            env: dev
            svc: test
            source: MYSQL_PORTR
            value: 3306    
    ```

## Exec 

```sh
    npm run start
```

## Functions (Parameter Store)

- Write
    - CLI 입력
    - 파일입력
- Delete
    - 선택해서 삭제
    - 입력해서 삭제
- Load
    - 전체 Parameter 로드