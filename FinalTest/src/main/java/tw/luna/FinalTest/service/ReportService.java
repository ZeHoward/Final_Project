package tw.luna.FinalTest.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import tw.luna.FinalTest.model.OrderDetails;
import tw.luna.FinalTest.model.Orders;
import tw.luna.FinalTest.repository.OrdersRepository;

@Service
public class ReportService {
    @Autowired
    private OrdersRepository ordersRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public byte[] generateExcelReport(String timeFrame) throws IOException {
        LocalDateTime startDate = calculateStartDate(timeFrame);
        List<Orders> orders = ordersRepository.findByOrderDateGreaterThanEqual(startDate);

        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            XSSFSheet sheet = workbook.createSheet("Order Report");

            // 創建標題行
            XSSFRow headerRow = sheet.createRow(0);
            String[] columns = {"Order ID", "Username", "Coupon Code", "Order Date", "Total Amount",
                                "Percentage Discount", "Amount Discount", "Final Amount", "Status", "Address",
                                "Product Name", "Quantity", "Price"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
            }

            int rowNum = 1;
            for (Orders order : orders) {
                XSSFRow row = sheet.createRow(rowNum);
                row.createCell(0).setCellValue(order.getOrderId());
                row.createCell(1).setCellValue(order.getUser().getUsername());
                row.createCell(2).setCellValue(order.getCoupon() != null ? order.getCoupon().getCode() : "No Coupon");
                row.createCell(3).setCellValue(order.getOrderDate().format(DATE_FORMATTER));
                row.createCell(4).setCellValue(order.getTotalAmount());
                row.createCell(5).setCellValue(order.getPercentageDiscount() != null ? order.getPercentageDiscount() : 0);
                row.createCell(6).setCellValue(order.getAmountDiscount() != null ? order.getAmountDiscount() : 0);
                row.createCell(7).setCellValue(order.getFinalAmount());
                row.createCell(8).setCellValue(order.getStatus());
                row.createCell(9).setCellValue(order.getAddress());

                // 處理訂單詳情
                List<OrderDetails> details = order.getOrderDetails();
                for (int i = 0; i < details.size(); i++) {
                    OrderDetails detail = details.get(i);
                    XSSFRow detailRow = (i == 0) ? row : sheet.createRow(rowNum + i);
                    
                    detailRow.createCell(10).setCellValue(detail.getProduct().getName());
                    detailRow.createCell(11).setCellValue(detail.getQuantity());
                    detailRow.createCell(12).setCellValue(detail.getPrice());
                }

                rowNum += Math.max(1, details.size());
            }

            // 自動調整列寬
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }

    public ResponseEntity<Resource> generateAndDownloadExcelReport(String timeFrame) throws IOException {
        byte[] reportBytes = generateExcelReport(timeFrame);
        ByteArrayResource resource = new ByteArrayResource(reportBytes);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=order_report.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(resource);
    }

    private LocalDateTime calculateStartDate(String timeFrame) {
        LocalDateTime now = LocalDateTime.now();
        return switch (timeFrame) {
            case "week" -> now.minusWeeks(1);
            case "month" -> now.minusMonths(1);
            case "year" -> now.minusYears(1);
            default -> now.minusDays(1);
        };
    }
}