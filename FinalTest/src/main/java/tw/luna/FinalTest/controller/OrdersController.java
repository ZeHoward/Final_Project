package tw.luna.FinalTest.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import tw.luna.FinalTest.dto.OrderWithUserDTO;
import tw.luna.FinalTest.dto.OrdersDTO;
import tw.luna.FinalTest.dto.orders.MerchantByUserDto;
import tw.luna.FinalTest.dto.orders.OrdersInsertDto;
import tw.luna.FinalTest.model.Orders;
import tw.luna.FinalTest.model.Payment;
import tw.luna.FinalTest.model.UserAllInfo;
import tw.luna.FinalTest.model.Users;
import tw.luna.FinalTest.service.OrdersService;
import tw.luna.FinalTest.service.PaymentService;
import tw.luna.FinalTest.service.ReportService;

@RequestMapping("/api/orders")
@RestController
public class OrdersController {
    private static final String UserAllInfo = null;

	Long userId = 1L; // 假設用戶 ID 固定為 1，實際情況應根據需求調整

    @Autowired
    OrdersService ordersService;
    
    @Autowired
	ReportService reportService;
    
    @Autowired
    HttpSession httpSession;

	@Autowired
	PaymentService paymentService;

	//透過userId查找payment 更新ordre付款狀態
	@GetMapping("/pay/{userId}")
	public List<String> getPaymentByUserId (@PathVariable Long userId){
		return  paymentService.findAllPayments(userId);
	}


    // 提交購物車商品->訂單
    @PostMapping ("/{userId}")
    public ResponseEntity<String> addToOrders(@RequestBody OrdersInsertDto ordersInsertDto, @PathVariable Long userId) {
        ordersService.insertOrder(ordersInsertDto,userId);
        return ResponseEntity.ok("成功新增訂單");
    }
    
    // 獲取所有訂單
 	@GetMapping
 	public List<Orders> getAllOrders(HttpSession session) {
 		
 		//session測試
 		Users user = (Users)session.getAttribute("user");
 		System.out.println("getAllOrders,userEmail : " + user.getEmail());
 		System.out.println("getAllOrders,userPassword : " + user.getPassword());
 		System.out.println("getAllOrders,userId : " + user.getUserId());

 		return ordersService.getAllOrders();
 	}

 	// 根據 ID 獲取單個訂單
 	@GetMapping("/{id}")
 	public ResponseEntity<OrdersDTO> getOrderById(@PathVariable Integer id) {
 	    Optional<OrdersDTO> optionalOrdersDTO = ordersService.getOrderById(id);

 	    if (optionalOrdersDTO.isPresent()) {
 	        return ResponseEntity.ok(optionalOrdersDTO.get());
 	    } else {
 	        return ResponseEntity.notFound().build();
 	    }
 	}
 	
 	@GetMapping("/page")
 	public ResponseEntity<Page<OrderWithUserDTO>> getOrdersWithPagination(
 	    @RequestParam("page") int page,
 	    @RequestParam("size") int size,
 	    @RequestParam("sortField") String sortField, // 排序字段
 	    @RequestParam("sortDirection") String sortDirection, // 排序方向 ("asc" 或 "desc")
 	    @RequestParam(value = "status", required = false) String status
 	) {
 		return ordersService.getOrdersWithPagination(page, size, sortField, sortDirection, status);
 	}

    
 	@GetMapping("/overview")
    public ResponseEntity<Map<String, Integer>> getOverview(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {

        Integer totalRevenue = ordersService.getTotalRevenue(startDate, endDate);
        Integer totalOrders = ordersService.getTotalOrdersCount(startDate, endDate);

        Map<String, Integer> overviewData = new HashMap<>();
        overviewData.put("revenue", totalRevenue);
        overviewData.put("ordersCount", totalOrders);

        return ResponseEntity.ok(overviewData);
    }
 	
 	@GetMapping("/chart-data")
 	public ResponseEntity<Map<String, Object>> getChartData(
 	    @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
 	    @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
 	    @RequestParam("range") String range // 接收前端傳入的範圍參數
 	) {
 	    List<String> labels = new ArrayList<>();
 	    List<Integer> values = new ArrayList<>();

		switch (range) {
			case "week":
				labels = ordersService.getDailyLabels(startDate, endDate);
				values = ordersService.getDailyRevenue(startDate, endDate);
				break;
			case "month":
				labels = ordersService.getMonthlyLabels(startDate, endDate);
				values = ordersService.getMonthlyRevenue(startDate, endDate);
				break;
			case "year":
				labels = ordersService.getYearlyLabels(startDate, endDate);
				values = ordersService.getYearlyRevenue(startDate, endDate);
				break;
			default:
				return ResponseEntity.badRequest().body(Map.of("error", "Invalid range specified"));
		}

 	    // 返回的資料格式
 	    Map<String, Object> chartData = new HashMap<>();
 	    chartData.put("labels", labels);
 	    chartData.put("values", values);

 	    return ResponseEntity.ok(chartData);
 	}
 	
 	@GetMapping("/report")
 	public ResponseEntity<Resource> downloadOrderReport(@RequestParam String timeRange) throws IOException {
        return reportService.generateAndDownloadExcelReport(timeRange);
    }
 	
// 	 @GetMapping("/getUserId")
//     public long getUserId() {
//         Users loggedInUser = null;
//         if(session != null) {
//             loggedInUser = (Users)session.getAttribute("loggedInUser");
//             if(loggedInUser != null) {
//                 System.out.println("在products中獲取UserID:" + loggedInUser.getUserId());
//             }
//         }
//         return loggedInUser.getUserId();
//     }
 	
 	@GetMapping("/user")
 	public ResponseEntity<List<OrdersDTO>> getUserOrders() {
 	    // 從 session 中獲取 UserAllInfo 對象
 		
 	    UserAllInfo loggedInUser = (UserAllInfo) httpSession.getAttribute("loggedInUser");
 	    Long userId = loggedInUser.getUserId();
 	    System.out.println(userId);

 	    // 如果 session 中的 userId 與 path 中的 userId 不一致，則拒絕訪問
 	    if (!loggedInUser.getUserId().equals(userId)) {
 	        return ResponseEntity.status(403).build();
 	    }

 	    // 查詢訂單
 	    List<OrdersDTO> orders = ordersService.getUserOrders(userId);
 	    return ResponseEntity.ok(orders);
 	}
 	
// 	@RequestMapping("/api/reports")
// 	public class ReportController {
// 	    
//
// 	}
 	

 	
// 	@GetMapping("/chart-data")
// 	public ResponseEntity<Map<String, Object>> getChartData(
// 	    @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
// 	    @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
// 	    @RequestParam("range") String range,
// 	    @RequestParam(value = "dataType", defaultValue = "revenue") String dataType // 新增參數
// 	) {
// 	    List<String> labels = new ArrayList<>();
// 	    List<Integer> values = new ArrayList<>();
//
// 	    switch (range) {
// 	        case "week":
// 	            labels = ordersService.getDailyLabels(startDate, endDate);
// 	            values = dataType.equals("revenue") ? 
// 	                     ordersService.getDailyRevenue(startDate, endDate) :
// 	                     ordersService.getDailyOrderCount(startDate, endDate);
// 	            break;
// 	        case "month":
// 	            labels = ordersService.getMonthlyLabels(startDate, endDate);
// 	            values = dataType.equals("revenue") ? 
// 	                     ordersService.getMonthlyRevenue(startDate, endDate) :
// 	                     ordersService.getMonthlyOrderCount(startDate, endDate);
// 	            break;
// 	        case "year":
// 	            labels = ordersService.getYearlyLabels(startDate, endDate);
// 	            values = dataType.equals("revenue") ? 
// 	                     ordersService.getYearlyRevenue(startDate, endDate) :
// 	                     ordersService.getYearlyOrderCount(startDate, endDate);
// 	            break;
// 	        default:
// 	            return ResponseEntity.badRequest().body(Map.of("error", "Invalid range specified"));
// 	    }
//
// 	    Map<String, Object> chartData = new HashMap<>();
// 	    chartData.put("labels", labels);
// 	    chartData.put("values", values);
//
// 	    return ResponseEntity.ok(chartData);
// 	}

}
