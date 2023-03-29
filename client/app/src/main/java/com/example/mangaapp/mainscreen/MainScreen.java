package com.example.mangaapp.mainscreen;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.example.mangaapp.R;
import com.example.mangaapp.function.SignIn;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainScreen extends AppCompatActivity {
    private static final String MY_PREFERENCE_NAME = "USER_ID";
    BottomNavigationView bottomNavigationView;
    RecyclerView rcvDSTruyenHot, rcvDSTruyenMoi;
    ImageView imgSearch, imgPhanLoai, imgAnhBia;
    String id;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setFullScreen();
        setContentView(R.layout.activity_main_screen);
        init();
        //GetTatCaTruyen();
        initGridView();
        initBottomNavigation();
        SharedPreferences sharedPreferences = getSharedPreferences(MY_PREFERENCE_NAME, MODE_PRIVATE);
        id = sharedPreferences.getString("value", "");
    }

    //Full màn hình
    private void setFullScreen() {
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
    }

    //khởi tạo bottom navigation
    @SuppressLint("NonConstantResourceId")
    private void initBottomNavigation() {
        bottomNavigationView.setSelected(false);
        bottomNavigationView.setOnItemSelectedListener(item -> {
            switch (item.getItemId()) {
                case R.id.account:
                    if (id.equals("")) {
                        startActivity(new Intent(MainScreen.this, SignIn.class));
                    }
                    break;
                case R.id.favorite:
                    if (id.equals("")) {
                        startActivity(new Intent(MainScreen.this, SignIn.class));
                    }
            }
            return false;
        });
    }

    //Khởi tạo
    public void init() {
        rcvDSTruyenMoi = findViewById(R.id.rcv_DSTruyenMoi);
        rcvDSTruyenHot = findViewById(R.id.rcv_DSTruyenHot);
        bottomNavigationView = findViewById(R.id.bottom_nav_view);
        imgSearch = findViewById(R.id.img_search_main);
        imgPhanLoai = findViewById(R.id.img_phanloai);
        imgAnhBia = findViewById(R.id.imgAnhBia);

    }

    private void initGridView() {
        GridLayoutManager gridLayoutManager = new GridLayoutManager(this, 3);
        rcvDSTruyenMoi.setLayoutManager(gridLayoutManager);
        rcvDSTruyenMoi.setNestedScrollingEnabled(false);
        rcvDSTruyenMoi.setFocusable(false);
        GridLayoutManager gridLayoutManager2 = new GridLayoutManager(this, 3);
        rcvDSTruyenHot.setLayoutManager(gridLayoutManager2);
        rcvDSTruyenHot.setNestedScrollingEnabled(false);
        rcvDSTruyenHot.setFocusable(false);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}