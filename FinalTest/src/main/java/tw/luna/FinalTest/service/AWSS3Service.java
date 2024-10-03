package tw.luna.FinalTest.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Service
public class AWSS3Service {

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.region}")
    private String region;

    private S3Client s3Client; // 將 s3Client 初始化推遲到 @PostConstruct

    // 構造函數
    public AWSS3Service() {
        // 留空，因為 S3Client 的初始化將放在 @PostConstruct 方法中
    }
    

    // @PostConstruct 確保在依賴注入完成後進行 S3Client 初始化
    @PostConstruct
    public void init() {

        // 從環境變量中讀取 AWS 憑證
        String accessKey = System.getenv("AWS_ACCESS_KEY");
        String secretKey = System.getenv("AWS_SECRET_KEY");

        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKey, secretKey);

        this.s3Client = S3Client.builder()
                .region(Region.of(region))  // 使用配置文件中的 region
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))  // 使用環境變量中的 AWS 憑證
                .build();
    }

    // 上傳文件到 S3
    public String uploadFile(byte[] fileBytes, String originalFileName) throws IOException {
        // 生成唯一的文件名
        String fileName = UUID.randomUUID() + "-" + originalFileName;

        // 構建 PutObjectRequest，指定要上傳的桶和文件名稱
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        try {
            // 上傳文件到 S3
            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(fileBytes));

            // 返回文件的 URL
            return String.format("https://%s.s3.amazonaws.com/%s", bucketName, fileName);

        } catch (S3Exception e) {
            System.err.println("Error uploading file to S3: " + e.awsErrorDetails().errorMessage());
            throw new IOException("Error uploading file to S3", e);
        }
    }
    
    public void deleteFile(String fileUrl) {
        // 根據 fileUrl 提取文件名
        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
        
        // 構建刪除請求
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }
}
