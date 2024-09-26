package com.NewTestApi.EatFun.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "userinfo")
public class Userinfo {

//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "id")
//	private Long id;

    @Id
    @Column(name = "userid")
    private Long userid;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "address")
    private String address;


    @Column(name = "postalCode")
    private String postalCode;

    @Column(name = "birthday")
    private String birthday;

    @Column(name = "county")
    private String county;

    @Column(name = "district")
    private String district;


    public String getLastName() {
        return lastName;
    }


    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getBirthday() {
        return birthday;
    }


    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }


    //	@OneToOne(mappedBy = "userinfo")
    @OneToOne
    @MapsId
    @JoinColumn(name = "userid")
    @JsonBackReference("Users_UserInfo")
    private Users users;


//	public Long getId() {
//		return id;
//	}
//
//
//	public void setId(Long id) {
//		this.id = id;
//	}


    public Long getUserid() {
        return userid;
    }


    public void setUserid(Long userid) {
        this.userid = userid;
    }


    public String getFirstName() {
        return firstName;
    }


    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    public String getAddress() {
        return address;
    }


    public void setAddress(String address) {
        this.address = address;
    }


    public String getPostalCode() {
        return postalCode;
    }


    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }


    public String getCounty() {
        return county;
    }


    public void setCounty(String county) {
        this.county = county;
    }


    public String getDistrict() {
        return district;
    }


    public void setDistrict(String district) {
        this.district = district;
    }


    public Users getUsers() {
        return users;
    }


    public void setUsers(Users users) {
        this.users = users;
    }



}